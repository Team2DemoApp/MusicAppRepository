const { createUserPlayList } = require('../controllers/playlistController'); 
const UserService = require("../services/service"); 
const { getUserPlayList } = require('../controllers/playlistController');
const { updateUserPlaylist } = require('../controllers/playlistController'); 
const mockRequest1 = (userinfo) => ({ userinfo });
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

jest.mock("../services/service"); // Mock the UserService

describe('createUserPlayList function', () => {
  it('should create a user playlist and return success message', async () => {
    // Arrange
    const mockReq = mockRequest({
      name: 'MyPlaylist',
      songs: ['song1', 'song2']
    }, {
      email: 'test@example.com'
    });
    const mockRes = mockResponse();
    const mockPlaylist = { name: 'MyPlaylist', songs: ['song1', 'song2'] };

    UserService.createUserPlayList.mockResolvedValueOnce(mockPlaylist);

    // Act
    await createUserPlayList(mockReq, mockRes);

    // Assert
    expect(mockRes.status).toHaveBeenCalledWith(200);
    expect(mockRes.json).toHaveBeenCalledWith({
      Message: 'User Playlist Created',
      playlist: mockPlaylist
    });
  });

  it('should handle errors and return 500 status', async () => {
    // Arrange
    const mockReq = mockRequest({
      name: 'MyPlaylist',
      songs: ['song1', 'song2']
    }, {
      email: 'test@example.com'
    });
    const mockRes = mockResponse();
    const mockError = new Error('Some error');

    UserService.createUserPlayList.mockRejectedValueOnce(mockError);

    // Act
     await createUserPlayList(mockReq, mockRes);

    // Assert
    expect(mockRes.status).toHaveBeenCalledWith(500);
   expect(mockRes.send).toHaveBeenCalledWith(mockError);
  });
});

describe('getUserPlayList function', () => {
    it('should get user playlist and return it', async () => {
      // Arrange
      const mockReq = mockRequest1({
        email: 'test@example.com'
      });
      const mockRes = mockResponse1();
      const mockPlaylist = { name: 'MyPlaylist', songs: ['song1', 'song2'] };
  
      UserService.getUserPlayList.mockResolvedValueOnce(mockPlaylist);
  
      // Act
      await getUserPlayList(mockReq, mockRes);
  
      // Assert
      expect(mockRes.send).toHaveBeenCalledWith(mockPlaylist);
    });
  
    it('should handle errors and return 500 status', async () => {
      // Arrange
      const mockReq = mockRequest1({
        email: 'test@example.com'
      });
      const mockRes = mockResponse();
      const mockError = new Error('Some error');
  
      UserService.getUserPlayList.mockRejectedValueOnce(mockError);
  
      // Act
      await getUserPlayList(mockReq, mockRes);
  
      // Assert
      expect(mockRes.status).toHaveBeenCalledWith(500);
      expect(mockRes.send).toHaveBeenCalledWith(mockError);
     
    });
  });

  describe('updateUserPlaylist function', () => {
    it('should update user playlist and return success message', async () => {
      // Arrange
      const mockReq = mockRequest1({
        _id: '65d5a3b98d1c8fabc81cc5d7',
        name: 'MyUpdatedPlaylist',
        songs: ['song3', 'song4']
      });
      const mockRes = mockResponse();
      const mockUpdatedPlaylist = { _id: '65d5a3b98d1c8fabc81cc5d7', name: 'MyUpdatedPlaylist', songs: ['song3', 'song4'] };
  
      UserService.updateUserPlaylist.mockResolvedValueOnce(mockUpdatedPlaylist);
  
      // Act
      await updateUserPlaylist(mockReq, mockRes);
    });
  
    it('should handle errors and return 500 status', async () => {
      // Arrange
      const mockReq = mockRequest1({
        _id: '65d5a3b98d1c8fabc81cc5d7',
        name: 'MyUpdatedPlaylist',
        songs: ['song3', 'song4']
      });
      const mockRes = mockResponse();
      const mockError = new Error('Some error');
  
      UserService.updateUserPlaylist.mockRejectedValueOnce(mockError);
  
      // Act
      await updateUserPlaylist(mockReq, mockRes);
  
      // Assert
      expect(mockRes.status).toHaveBeenCalledWith(500);
    });
  });
