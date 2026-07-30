#!/usr/bin/env node
// Requires Node 18+ (uses built-in fetch)

import { readFileSync, writeFileSync } from 'fs';
import { load } from 'js-yaml';

// Load .env.local into process.env (values already in env take precedence)
try {
    const env = readFileSync('.env.local', 'utf8');
    for (const line of env.split('\n')) {
        const trimmed = line.trim();
        if (!trimmed || trimmed.startsWith('#')) continue;
        const eqIdx = trimmed.indexOf('=');
        if (eqIdx > 0) {
            const key = trimmed.slice(0, eqIdx).trim();
            const value = trimmed.slice(eqIdx + 1).trim();
            if (!(key in process.env)) process.env[key] = value;
        }
    }
} catch {}

function extractAlbumId(url) {
    const match = url.match(/albums\/(\d+)/);
    return match?.[1] ?? null;
}

async function fetchAlbumImages(albumUrl) {
    const albumId = extractAlbumId(albumUrl);
    if (!albumId) {
        throw new Error(`Could not extract album ID from Flickr URL: ${albumUrl}`);
    }

    const apiKey = process.env.FLICKR_API_KEY;
    if (!apiKey) {
        throw new Error(
            'FLICKR_API_KEY is not set. Add it to .env.local or set it as an environment variable.'
        );
    }

    const allPhotos = [];
    let title = '';
    let description = undefined;
    let page = 1;
    let totalPages = 1;

    do {
        const params = new URLSearchParams({
            method: 'flickr.photosets.getPhotos',
            api_key: apiKey,
            photoset_id: albumId,
            extras: 'url_3k,url_k',
            format: 'json',
            nojsoncallback: '1',
            per_page: '500',
            page: String(page),
        });

        const res = await fetch(`https://api.flickr.com/services/rest/?${params}`);
        if (!res.ok) {
            throw new Error(`HTTP ${res.status} fetching Flickr album ${albumUrl}`);
        }

        const data = await res.json();
        if (data.stat !== 'ok') {
            throw new Error(`Flickr API error for album ${albumUrl}: ${data.message}`);
        }


        if (page === 1) {
            title = data.photoset?.title ?? 'Album';
            description = data.photoset?.description
        }

        allPhotos.push(...data.photoset.photo);
        totalPages = data.photoset.pages;
        page++;
    } while (page <= totalPages);

    const images = allPhotos.map(photo => {
        if (photo.url_3k) return photo.url_3k;
        if (photo.url_k) return photo.url_k;
        // Fallback: construct URL from photo metadata
        return `https://live.staticflickr.com/${photo.server}/${photo.id}_${photo.secret}_3k.jpg`;
    });

    return { title, description, images };
}

async function main() {
    const yaml = readFileSync('./src/projects.yaml', 'utf8');
    const projects = load(yaml);

    const processed = await Promise.all(
        projects.map(async project => {
            if (!project.flickrAlbum) return project;

            return await fetchAlbumImages(project.flickrAlbum);
        })
    );

    writeFileSync('./src/projects.json', JSON.stringify(processed, null, 2));
    console.log('projects.json generated successfully.');
}

main().catch(err => {
    console.error(`Error: ${err.message}`);
    process.exit(1);
});
