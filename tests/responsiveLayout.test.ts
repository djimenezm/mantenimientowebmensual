import { readStyles } from './readStyles';
import { describe, expect, it } from "vitest";

const css = readStyles();

describe("responsive layout safeguards", () => {
  it("allows calculator grid children to shrink without horizontal overflow", () => {
    expect(css).toMatch(
      /\.maintenance-calculator-shell\s*>\s*\*\s*\{[^}]*min-width:\s*0;/s,
    );
    expect(css).toMatch(
      /\.maintenance-calculator-shell:has\(\.result-card\)\s*\{[^}]*grid-template-columns:\s*minmax\(0,\s*1fr\);/s,
    );
  });

  it("wraps the mobile navigation instead of clipping it", () => {
    expect(css).toMatch(
      /@media\s*\(max-width:\s*560px\)[\s\S]*?\.nav\s*\{[^}]*flex-wrap:\s*wrap;[^}]*overflow-x:\s*visible;/,
    );
  });

  it("keeps the maintenance headline within narrow screens", () => {
    expect(css).toMatch(
      /@media\s*\(max-width:\s*900px\)[\s\S]*?\.maintenance-hero h1\s*\{[^}]*max-width:\s*13\.5ch;/,
    );
    expect(css).toMatch(
      /@media\s*\(max-width:\s*560px\)[\s\S]*?\.maintenance-hero h1\s*\{[^}]*max-width:\s*100%;/,
    );
    expect(css).toMatch(
      /@media\s*\(max-width:\s*340px\)[\s\S]*?\.maintenance-hero h1\s*\{[^}]*max-width:\s*100%;[^}]*font-size:\s*2\.55rem;/,
    );
  });

  it("wraps long legal-page links", () => {
    expect(css).toMatch(
      /\.legal-page a\s*\{[^}]*overflow-wrap:\s*anywhere;/s,
    );
  });
});
