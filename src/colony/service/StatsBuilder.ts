const minLineLength = 5;

export class StatsBuilder {
  private readonly lines: string[];
  private longestLineLength: number;

  private output = '';
  private outputWidth = 0;

  public constructor() {
    this.lines = [];
    this.longestLineLength = minLineLength;

    return this;
  }

  public add(text: string): this {
    this.lines.push(text);
    if (text.length > this.longestLineLength) {
      this.longestLineLength = text.length;
    }

    return this;
  }

  public build(): string {
    this.outputWidth = this.longestLineLength + 4;
    this.addBoxLine();
    for (const line of this.lines) {
      this.wrapLine(line);
    }
    this.addBoxLine();

    return this.output;
  }

  private addBoxLine() {
    for (let i = 1; i <= this.outputWidth; i += 1) {
      this.output += '-';
    }
    this.output += '\n';
  }

  private wrapLine(text: string) {
    this.output += '| ';
    this.output += text;
    this.output += this.createFill(text);
    this.output += ' |\n';
  }

  private createFill(text: string) {
    const length = this.longestLineLength - text.length;
    let output = '';
    for (let i = 1; i <= length; i += 1) {
      output += ' ';
    }
    return output;
  }
}
