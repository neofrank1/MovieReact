// lib/tmdb.ts
const BASE_URL = "https://api.themoviedb.org/3";
export const IMAGE_BASE = "https://image.tmdb.org/t/p/w500";
export const BACKDROP_BASE = "https://image.tmdb.org/t/p/original";

async function tmdbFetch(path: string) {
    const res = await fetch(`${BASE_URL}${path}`, {
        headers: { Authorization: `Bearer ${process.env.TMDB_TOKEN}` },
        next: { revalidate: 3600 },
    });
    if (!res.ok) throw new Error(`TMDB request failed: ${path}`);
    return res.json();
}

export const getTopRatedMovie = () => tmdbFetch("/movie/top_rated");
export const getTrending = () => tmdbFetch("/trending/movie/week");
export const getMovie = (id: string) => tmdbFetch(`/movie/${id}?append_to_response=credits,similar,videos`);
export const discoverMovies = (genreId?: string) => tmdbFetch(`/discover/movie${genreId ? `?with_genres=${genreId}` : ""}`);
export const getGenres = () => tmdbFetch("/genre/movie/list");
export const getTopRatedTV = () => tmdbFetch("/tv/top_rated");
export const getPopularTV = () => tmdbFetch("/tv/popular");
