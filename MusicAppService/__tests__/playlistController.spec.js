const { createUserPlaylist } = require("../controllers/playlistController");
const playlistService = require("../services/playlistService");
const { getUserPlaylist } = require("../controllers/playlistController");
const mockRequest1 = userinfo => ({ userinfo });
const mockResponse1 = () => {
  const res = {};
  res.status = jest.fn().mockReturnValue(res);
  res.send = jest.fn().mockReturnValue(res);
  return res;
};
const mockRequest = (body, userInfo) => ({ body, userinfo: userInfo });
const mockResponse = () => {
  const res = {};
  res.status = jest.fn().mockReturnValue(res);
  res.json = jest.fn().mockReturnValue(res);
  res.send = jest.fn().mockReturnValue(res);
  return res;
};

jest.mock("../services/playlistService"); // Mock the playlist service

describe("createUserPlaylist function", () => {
  it("should create a user playlist and return success message", async () => {
    // Arrange
    const mockReq = mockRequest(
      {
        name: "MyPlaylist",
        songs: ["song1", "song2"]
      },
      {
        email: "test@example.com"
      }
    );
    const mockRes = mockResponse();
    const mockPlaylist = { name: "MyPlaylist", songs: ["song1", "song2"] };

    playlistService.createUserPlaylist.mockResolvedValueOnce(mockPlaylist);

    // Act
    await createUserPlaylist(mockReq, mockRes);

    // Assert
    expect(mockRes.status).toHaveBeenCalledWith(200);
    expect(mockRes.json).toHaveBeenCalledWith({
      Message: "User playlist created",
      playlist: mockPlaylist
    });
  });

  it("should handle errors and return 500 status", async () => {
    // Arrange
    const mockReq = mockRequest(
      {
        name: "MyPlaylist",
        songs: ["song1", "song2"]
      },
      {
        email: "test@example.com"
      }
    );
    const mockRes = mockResponse();
    const mockError = new Error("Some error");

    playlistService.createUserPlaylist.mockRejectedValueOnce(mockError);

    // Act
    await createUserPlaylist(mockReq, mockRes);

    // Assert
    expect(mockRes.status).toHaveBeenCalledWith(500);
    expect(mockRes.send).toHaveBeenCalledWith(mockError);
  });
});

describe("getUserPlaylist function", () => {
  it("should get user playlist and return it", async () => {
    // Arrange
    const mockReq = mockRequest1({
      email: "test@example.com"
    });
    const mockRes = mockResponse1();
    const mockPlaylist = {_id:"65d5bde3075e233f145049ee", name: "MyPlaylist","email": "sushdube@test.com" };

    playlistService.getUserPlaylist.mockResolvedValueOnce(mockPlaylist);

    // Act
    await getUserPlaylist(mockReq, mockRes);

    // Assert
    expect(mockRes.send).toHaveBeenCalledWith(mockPlaylist);
  });

  it("should handle errors and return 500 status", async () => {
    // Arrange
    const mockReq = mockRequest1({
      email: "test@example.com"
    });
    const mockRes = mockResponse();
    const mockError = new Error("Some error");

    playlistService.getUserPlaylist.mockRejectedValueOnce(mockError);

    // Act
    await getUserPlaylist(mockReq, mockRes);

    // Assert
    expect(mockRes.status).toHaveBeenCalledWith(500);
    expect(mockRes.send).toHaveBeenCalledWith(mockError);
  });
});
