export class BookDTO {
  id: number;
  name: string;
  score: string;

  constructor(id: number, name: string, score: number | null) {
    this.id = id;
    this.name = name;
    this.score = String(score || -1);
  }
}
