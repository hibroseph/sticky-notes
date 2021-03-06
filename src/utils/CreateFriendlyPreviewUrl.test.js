import { CreateFriendlyPreviewUrl } from './CreateFriendlyPreviewUrl';

test("Creates friendly url from https://github.com", () => {
    expect(CreateFriendlyPreviewUrl("https://github.com")).toBe("github.com");
})

test("Creates friendly url from http:github.com", () => {
    expect(CreateFriendlyPreviewUrl("http:github.com")).toBe("github.com");
})

test("Creates friendly url from http://github.com", () => {
    expect(CreateFriendlyPreviewUrl("http://github.com")).toBe("github.com");
})

test("Creates friendly url from http://github.com/issues/new", () => {
    expect(CreateFriendlyPreviewUrl("http://github.com/issues/new")).toBe("github.com/issues/new");
})

test("Creates friendly url from http://github.com/issues/new?title=hello", () => {
    expect(CreateFriendlyPreviewUrl("http://github.com/issues/new")).toBe("github.com/issues/new");
})

test("Creates friendly url from https://stackoverflow/issues/new?title=hello", () => {
    expect(CreateFriendlyPreviewUrl("https://stackoverflow/issues/new?title=hello")).toBe("stackoverflow/issues/new");
})

test("Creates friendly url from https://www.stackoverflow/issues/new?title=hello", () => {
    expect(CreateFriendlyPreviewUrl("https://www.stackoverflow/issues/new?title=hello")).toBe("stackoverflow/issues/new");
})


test("Creates friendly url from https://www.google.com", () => {
    expect(CreateFriendlyPreviewUrl("https://www.google.com")).toBe("google.com");
})