interface Movie {
	id: number;
	backdrop_path: string;
	title: string | null;
	name: string | null;
	overview: string;
	release_date: string | null;
	first_air_date: string | null;
}

export type { Movie }