const { loginUser } = require('../controllers/loginController');
const loginService =  require("../services/service"); 
const mockRequest = (body) => ({ body });
const mockResponse = () => {
  const res = {};
  res.status = jest.fn().mockReturnValue(res);
  res.json = jest.fn().mockReturnValue(res);
  res.send = jest.fn().mockReturnValue(res);
  return res;
};

jest.mock("../services/service");

describe('loginUser function', () => {
  it('should return a token when login is successful', async () => {
    // Arrange
    const mockReq = mockRequest({
      email: 'test@example.com',
      password: 'password123'
    });
    const mockRes = mockResponse();
    const mockToken = 'mockToken';

    loginService.loginUser.mockResolvedValueOnce(mockToken);

    // Act
    await loginUser(mockReq, mockRes);

    // Assert
    expect(mockRes.status).toHaveBeenCalledWith(200);
    expect(mockRes.json).toHaveBeenCalledWith({ token: mockToken });
  });

  it('should return 401 status and error message when login fails', async () => {
    // Arrange
    const mockReq = mockRequest({
      email: 'test@example.com',
      password: 'wrongPassword'
    });
    const mockRes = mockResponse();

    loginService.loginUser.mockResolvedValueOnce(null);

    // Act
    await loginUser(mockReq, mockRes);

    // Assert
    expect(mockRes.status).toHaveBeenCalledWith(401);
    expect(mockRes.json).toHaveBeenCalledWith({ message: 'Token Not Generated!!' });
  });

  it('should return 500 status and error message when an exception occurs', async () => {
    // Arrange
    const mockReq = mockRequest({
      email: 'test@example.com',
      password: 'password123'
    });
    const mockRes = mockResponse();
    const mockError = new Error('Some error');

    loginService.loginUser.mockRejectedValueOnce(mockError);

    // Act
    await loginUser(mockReq, mockRes);

    // Assert
    expect(mockRes.status).toHaveBeenCalledWith(500);
    expect(mockRes.send).toHaveBeenCalledWith(mockError);
  });
});
