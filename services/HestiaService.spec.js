const expenseService = require("../services/HestiaService");
const { mockSampleCSV, mockTransformedCSV } = require("../test/data/mock-data");
describe("HestiaService", () => {
  it("should be defined", () => {
    expect(expenseService).toBeDefined();
  });

  describe("pivotCSV", () => {
    it("Can pivot CSV", async () => {
      const expected = await expenseService.pivotCSV(mockSampleCSV);
      expect(expected).toEqual(mockTransformedCSV);
    });
  });
});
