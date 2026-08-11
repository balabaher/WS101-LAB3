// JSONPlaceholder Todo
export interface Todo {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
}

// PokéAPI Pokemon
export interface PokemonResult {
  name: string;
  url: string;
}

export interface PokemonListResponse {
  count: number;
  results: PokemonResult[];
}

// Rick & Morty Character
export interface Character {
  id: number;
  name: string;
  status: string;
  species: string;
  image: string;
}

export interface CharacterResponse {
  results: Character[];
}
