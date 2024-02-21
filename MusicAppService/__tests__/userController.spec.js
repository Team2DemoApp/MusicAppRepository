const { createUser } = require('../controllers/userController');
const { editUser } = require('../controllers/userController');
const { deleteUser } = require('../controllers/userController');
const { getUsers } = require('../controllers/userController');
const { getUsersById } = require('../controllers/userController');

const UserService = require('../services/userService');

jest.mock('../services/userService');

describe('createUser', () => {
  it('should create a user and return a success message', async () => {
    // Mocking UserService.createUser to return a sample user
    const mockUser = { id: 1, username: 'testUser', email: 'test@example.com' };
    UserService.createUser.mockResolvedValue(mockUser);

    // Mocking request and response objects
    const req = {
      body: {
        username: 'testUser',
        email: 'test@example.com',
        password: 'password123',
        rpassword: 'password123',
      },
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockReturnThis(),
      send: jest.fn().mockReturnThis(),
    };

    // Calling the createUser function
    await createUser(req, res);

    // Assertions
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.send).not.toHaveBeenCalled();
  });

  it('should handle errors and send a 500 status', async () => {
    // Mocking UserService.createUser to throw an error
    const mockError = new Error('Something went wrong');
    UserService.createUser.mockRejectedValue(mockError);

    // Mocking request and response objects
    const req = {
      body: {
        username: 'testUser',
        email: 'test@example.com',
        password: 'password123',
        rpassword: 'password123',
      },
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
      send: jest.fn(),
    };

    // Calling the createUser function
    await createUser(req, res);

    // Assertions
    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.send).toHaveBeenCalledWith(mockError);
    expect(res.json).not.toHaveBeenCalled();
  });
});

describe('editUser', () => {
    it('should edit a user and return a success message', async () => {
      // Mocking UserService.editUser to return a sample updated user
      const mockUpdatedUser = { _id: 1, username: 'editedUser', email: 'edited@example.com' };
      UserService.editUser.mockResolvedValue(mockUpdatedUser);
  
      // Mocking request and response objects
      const req = {
        body: {
          id: 1,
          username: 'editedUser',
          email: 'edited@example.com',
          password: 'newpassword123',
          rpassword: 'newpassword123',
        },
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
        send: jest.fn(),
      };
  
      // Calling the editUser function
      await editUser(req, res);
  
      // Assertions
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.send).not.toHaveBeenCalled();
    });
  
    it('should handle user not found and return a 401 status', async () => {
      // Mocking UserService.editUser to return null (user not found)
      UserService.editUser.mockResolvedValue(null);
  
      // Mocking request and response objects
      const req = {
        params: { id: 1 },
        body: {
          username: 'editedUser',
          email: 'edited@example.com',
          password: 'newpassword123',
          rpassword: 'newpassword123',
        },
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
        send: jest.fn(),
      };
  
      // Calling the editUser function
      await editUser(req, res);
  
      // Assertions
      expect(res.status).toHaveBeenCalledWith(401);
      expect(res.json).toHaveBeenCalledWith({
        Message: 'User details not updated',
        updatedUser: null,
      });
      expect(res.send).not.toHaveBeenCalled();
    });
  
    it('should handle invalid user and return a 500 status', async () => {
      // Mocking UserService.editUser to return "Invalid User!!"
      UserService.editUser.mockResolvedValue('Invalid User!!');
  
      // Mocking request and response objects
      const req = {
        body: {
          id: 1,
          username: 'editedUser',
          password: 'newpassword123',
          rpassword: 'newpassword123',
        },
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
        send: jest.fn(),
      };
  
      // Calling the editUser function
      await editUser(req, res);
  
      // Assertions
      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({
        Message: 'User details not updated',
      });
      expect(res.send).not.toHaveBeenCalled();
    });
  
    it('should handle errors and return a 500 status', async () => {
      // Mocking UserService.editUser to throw an error
      const mockError = new Error('Something went wrong');
      UserService.editUser.mockRejectedValue(mockError);
  
      // Mocking request and response objects
      const req = {
        body: {
          id: 1,
          username: 'editedUser',
          password: 'newpassword123',
          rpassword: 'newpassword123',
        },
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
        send: jest.fn(),
      };
  
      // Calling the editUser function
      await editUser(req, res);
  
      // Assertions
      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.send).toHaveBeenCalledWith(mockError);
      expect(res.json).not.toHaveBeenCalled();
    });
  });

  describe('deleteUser', () => {
    it('should delete a user and return a success message', async () => {
      // Mocking UserService.deleteUser to return a sample deleted user
      const mockDeletedUser = { _id: 1, username: 'deletedUser', email: 'deleted@example.com' };
      UserService.deleteUser.mockResolvedValue(mockDeletedUser);
  
      // Mocking request and response objects
      const req = {
        body: { id: 1 },
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
        send: jest.fn(),
      };
  
      // Calling the deleteUser function
      await deleteUser(req, res);
  
      // Assertions
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        Message: 'User deleted successfully!!',
        deletedUser: mockDeletedUser,
      });
      expect(res.send).not.toHaveBeenCalled();
    });
  
    it('should handle user not found and return a 401 status', async () => {
      // Mocking UserService.deleteUser to return null (user not found)
      UserService.deleteUser.mockResolvedValue(null);
  
      // Mocking request and response objects
      const req = {
        body: { id: 1 },
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
        send: jest.fn(),
      };
  
      // Calling the deleteUser function
      await deleteUser(req, res);
  
      // Assertions
      expect(res.status).toHaveBeenCalledWith(401);
      expect(res.json).toHaveBeenCalledWith({
        Message: 'User not deleted',
      });
      expect(res.send).not.toHaveBeenCalled();
    });
  
    it('should handle invalid user and return a 500 status', async () => {
      // Mocking UserService.deleteUser to return "Invalid User!!"
      UserService.deleteUser.mockResolvedValue('Invalid User!!');
  
      // Mocking request and response objects
      const req = {
        body: { id: 1 },
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
        send: jest.fn(),
      };
  
      // Calling the deleteUser function
      await deleteUser(req, res);
  
      expect(res.send).not.toHaveBeenCalled();
    });
  
    it('should handle errors and return a 500 status', async () => {
      // Mocking UserService.deleteUser to throw an error
      const mockError = new Error('Something went wrong');
      UserService.deleteUser.mockRejectedValue(mockError);
  
      // Mocking request and response objects
      const req = {
        params: { id: 1 },
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
        send: jest.fn(),
      };
  
      // Calling the deleteUser function
      await deleteUser(req, res);
  
      // Assertions
      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.send).toHaveBeenCalledWith(mockError);
      expect(res.json).not.toHaveBeenCalled();
    });
  });

  describe('getUsers', () => {
    it('should get users and return a success message', async () => {
      // Mocking UserService.getUsers to return sample user data
      const mockUserData = [
        { _id: 1, username: 'user1', email: 'user1@example.com' },
        { _id: 2, username: 'user2', email: 'user2@example.com' },
      ];
      UserService.getUsers.mockResolvedValue(mockUserData);
  
      // Mocking request and response objects
      const req = {};
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
        send: jest.fn(),
      };
  
      // Calling the getUsers function
      await getUsers(req, res);
  
      // Assertions
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.send).toHaveBeenCalledWith(mockUserData);
      expect(res.json).not.toHaveBeenCalled();
    });
  
    it('should handle no users and return a 200 status with a message', async () => {
      // Mocking UserService.getUsers to return null (no users)
      UserService.getUsers.mockResolvedValue(null);
  
      // Mocking request and response objects
      const req = {};
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
        send: jest.fn(),
      };
  
      // Calling the getUsers function
      await getUsers(req, res);
  
      // Assertions
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        Message: 'No users exists',
      });
      expect(res.send).not.toHaveBeenCalled();
    });
  
    it('should handle errors and return a 500 status', async () => {
      // Mocking UserService.getUsers to throw an error
      const mockError = new Error('Something went wrong');
      UserService.getUsers.mockRejectedValue(mockError);
  
      // Mocking request and response objects
      const req = {};
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
        send: jest.fn(),
      };
  
      // Calling the getUsers function
      await getUsers(req, res);
  
      // Assertions
      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.send).toHaveBeenCalledWith(mockError);
      expect(res.json).not.toHaveBeenCalled();
    });
  });

  describe('getUsersById', () => {
    it('should get user by ID and return a success message', async () => {
      // Mocking UserService.getUsersById to return sample user data
      const mockUserData = { _id: 1, username: 'user1', email: 'user1@example.com' };
      UserService.getUsersById.mockResolvedValue(mockUserData);
  
      // Mocking request and response objects
      const req = { params: { id: 1 } };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
        send: jest.fn(),
      };
  
      // Calling the getUsersById function
      await getUsersById(req, res);
  
      // Assertions
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.send).toHaveBeenCalledWith(mockUserData);
      expect(res.json).not.toHaveBeenCalled();
    });
  
    it('should handle no user found and return a 200 status with a message', async () => {
      // Mocking UserService.getUsersById to return null (no user found)
      UserService.getUsersById.mockResolvedValue(null);
  
      // Mocking request and response objects
      const req = { params: { id: 1 } };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
        send: jest.fn(),
      };
  
      // Calling the getUsersById function
      await getUsersById(req, res);
  
      // Assertions
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        Message: 'User does not exists',
      });
      expect(res.send).not.toHaveBeenCalled();
    });
  
    it('should handle errors and return a 500 status', async () => {
      // Mocking UserService.getUsersById to throw an error
      const mockError = new Error('Something went wrong');
      UserService.getUsersById.mockRejectedValue(mockError);
  
      // Mocking request and response objects
      const req = { params: { id: 1 } };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
        send: jest.fn(),
      };
  
      // Calling the getUsersById function
      await getUsersById(req, res);
  
      // Assertions
      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.send).toHaveBeenCalledWith(mockError);
      expect(res.json).not.toHaveBeenCalled();
    });
  });