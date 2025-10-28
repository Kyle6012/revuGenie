import { imagekit } from "../imagekit";

jest.mock("imagekit", () => ({
  __esModule: true,
  default: jest.fn(() => ({
    upload: jest.fn(),
  })),
}));

jest.mock("uuid", () => ({
  v4: () => "mock-uuid",
}));

describe("ImageKit Service", () => {
  it("should upload a file", async () => {
    const file = new File([""], "test.jpg", { type: "image/jpeg" });
    await imagekit.upload({
      file,
      fileName: file.name,
    });

    expect(imagekit.upload).toHaveBeenCalledWith({
      file,
      fileName: file.name,
    });
  });
});
