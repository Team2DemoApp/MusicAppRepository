const { loginUser,changePassword } = require('../controllers/loginController');
const loginService =  require("../services/loginService"); 

const mockRequest = (body) => ({ body });
const mockResponse = () => {
  const res = {};
  res.status = jest.fn().mockReturnValue(res);
  res.json = jest.fn().mockReturnValue(res);
  res.send = jest.fn().mockReturnValue(res);
  return res;
};

jest.mock("../services/loginService");

describe('loginUser function', () => {
  it('should return a token when login is successful', async () => {
    // Arrange
    const mockReq = mockRequest({
      email: 'test@example.com',
      password: 'password123'
    });
    const mockRes = mockResponse();
    const mockToken = 'mockToken';    
    
    loginService.loginUser.mockResolvedValueOnce({ userInfo: 'mockToken' });

    // Act
    await loginUser(mockReq, mockRes);

    // Assert
    expect(mockRes.status).toHaveBeenCalledWith(200);
    expect(mockRes.json).toHaveBeenCalledWith({ token: 'mockToken' });
  });

  it('should return 401 status and error message when login fails', async () => {
    // Arrange
    const mockReq = mockRequest({
      email: 'test@example.com',
      password: 'wrongPassword'
    });
    const mockRes = mockResponse();

    loginService.loginUser.mockResolvedValueOnce({ message: 'Invalid credentials' });

    // Act
    await loginUser(mockReq, mockRes);

    // Assert
    expect(mockRes.status).toHaveBeenCalledWith(401);
    expect(mockRes.json).toHaveBeenCalledWith({ message: 'Invalid credentials' });
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

describe('changePassword function', () => {
  it('should return 200 status with updated user information', async () => {
     // Arrange
    const mockReq = mockRequest({
    email: 'test@example.com',
    password: 'oldPassword',
    rpassword: 'newPassword'
    });
    const mockRes = mockResponse();

  
    loginService.changePassword.mockResolvedValueOnce({ userInfo: 'Updated user info' });
   

    // Call the function
    // Act
    await changePassword(mockReq, mockRes);

    // Expect status to be 200 and return updated user info
    // Assert
    expect(mockRes.status).toHaveBeenCalledWith(200);
    expect(mockRes.json).toHaveBeenCalledWith({ userInfo: 'Updated user info' });
  });

  it('should return 401 status if password change fails', async () => {

    const mockReq = mockRequest({
      email: 'wrong@example.com',
      password: 'oldPassword',
      rpassword: 'newPassword'
      });
      
    const mockRes = mockResponse();
   
    loginService.changePassword.mockResolvedValueOnce({ message: 'Invalid User' });
  
    // Call the function
     // Act
    await changePassword(mockReq, mockRes);

    // Expect status to be 401 and return error message
     // Assert
    expect(mockRes.json).toHaveBeenCalledWith({ message: 'Invalid User' });
  });

  it('should return 500 status if an error occurs', async () => {

    const mockReq = mockRequest({
      email: 'wrong@example.com',
      password: 'oldPassword',
      rpassword: 'newPassword'
      });

      const mockRes = mockResponse();
   
    loginService.changePassword.mockRejectedValue(new Error('Internal Server Error'));
  

    // Call the function
    await changePassword(mockReq, mockRes);

    // Expect status to be 500 and return error message
    expect(mockRes.status).toHaveBeenCalledWith(500);
    expect(mockRes.send).toHaveBeenCalledWith(new Error('Internal Server Error'));
  });
});