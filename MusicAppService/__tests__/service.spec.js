const { createUser } = require("../services/userService");
const Users = require("../model/user");

const { editUser } = require("../services/userService"); 
const { deleteUser } = require("../services/userService");
const { getUsers } = require("../services/userService");
const { getUsersById } = require("../services/userService");
const { loginUser } = require("../services/loginService"); 

var resultMock = {
  userInfo:'',
  message:'',
  error:''
}
const mockGenerateAuthToken = jest.fn();
jest.mock("../model/user"); // Mock the Users model

describe("createUser function", () => {
  it("should create a user when passwords match", async () => {
    // Arrange
    const mockUserData = {
      username: "testuser",
      email: "test@example.com",
      password: "password123",
      rpassword: "password123",
    };

    Users.mockImplementationOnce(() => ({
      save: jest.fn().mockResolvedValueOnce(mockUserData),
    }));

    // Act
    const result = await createUser(
      mockUserData.username,
      mockUserData.email,
      mockUserData.password,
      mockUserData.rpassword
    );

    // Assert
    expect(result.userInfo).toEqual(mockUserData);
  });

  it('should return "Passwords do NOT match" when passwords do not match', async () => {
    // Arrange
    const mockUserData = {
      username: "testuser",
      email: "test@example.com",
      password: "password123",
      rpassword: "differentpassword",
    };

    // Act
    const result = await createUser(
      mockUserData.username,
      mockUserData.email,
      mockUserData.password,
      mockUserData.rpassword
    );

    // Assert
    expect(result.message).toEqual("Passwords do NOT match");
  });

  it("should return an error when there is an exception", async () => {
    // Arrange
    const mockUserData = {
      username: "testuser",
      email: "test@example.com",
      password: "password123",
      rpassword: "password123",
    };

    Users.mockImplementationOnce(() => ({
      save: jest.fn().mockRejectedValueOnce(new Error("Some error")),
    }));

    // Act
    const result = await createUser(
      mockUserData.username,
      mockUserData.email,
      mockUserData.password,
      mockUserData.rpassword
    );

    // Assert
    expect(result.error).toBeInstanceOf(Error);
  });
});

describe("editUser function", () => {
  it("should edit a user when user is found", async () => {
    // Arrange
    const mockUserData = {
      _id: "mockUserId",
      username: "testuser",
      password: "oldPassword",
      rpassword: "oldPassword",
    };

    const mockUpdatedUserData = {
      _id: "mockUserId",
      username: "updatedUser",
      email: "test@example.com",
      password: "newPassword",
      rpassword: "newPassword",
    };

    Users.findOne.mockResolvedValueOnce(mockUserData);
    Users.findByIdAndUpdate.mockResolvedValueOnce(mockUpdatedUserData);

    // Act
    const result = await editUser(
      mockUserData._id,
      mockUpdatedUserData.username,
      mockUpdatedUserData.password,
      mockUpdatedUserData.rpassword
    );

    // Assert
    expect(result).toEqual(mockUpdatedUserData);
  });

  it('should return "Invalid user!!" when user is not found', async () => {
    // Arrange
    const mockUserId = "nonexistentUserId";
    Users.findOne.mockResolvedValueOnce(null);

    // Act
    const result = await editUser(
      mockUserId,
      "newUsername",
      "newEmail@example.com",
      "newPassword",
      "newPassword"
    );

  });

  it("should return an error when there is an exception", async () => {
    // Arrange
    const mockUserData = {
      _id: "mockUserId",
      username: "testuser",
      email: "test@example.com",
      password: "oldPassword",
      rpassword: "oldPassword",
    };

    Users.findOne.mockRejectedValueOnce(new Error("Some error"));

    // Act
    const result = await editUser(
      mockUserData._id,
      "newUsername",
      "newEmail@example.com",
      "newPassword",
      "newPassword"
    );
  });
});

describe("deleteUser function", () => {
  it("should delete a user when user is found", async () => {
    // Arrange
    const mockUserData = {
      _id: "mockUserId",
      username: "testuser",
      email: "test@example.com",
      password: "password123",
      rpassword: "password123",
    };

    Users.findOne.mockResolvedValueOnce(mockUserData);
    Users.findByIdAndDelete.mockResolvedValueOnce(mockUserData);

    // Act
    const result = await deleteUser(mockUserData._id);

    // Assert
    expect(result).toEqual(mockUserData);
  });

  it('should return "Invalid user!!" when user is not found', async () => {
    // Arrange
    const mockUserId = "nonexistentUserId";
    Users.findOne.mockResolvedValueOnce(null);

    // Act
    const result = await deleteUser(mockUserId);

    // Assert
    expect(result).toEqual("Invalid user!!");
  });

  it("should return an error when there is an exception", async () => {
    // Arrange
    const mockUserId = "mockUserId";
    Users.findOne.mockRejectedValueOnce(new Error("Some error"));

    // Act
    const result = await deleteUser(mockUserId);

    // Assert
    expect(result).toBeInstanceOf(Error);
  });
});

describe("getUsers function", () => {
  it("should get all users when there are users in the database", async () => {
    // Arrange
    const mockUserData = [
      { _id: "1", username: "user1", email: "user1@example.com" },
      { _id: "2", username: "user2", email: "user2@example.com" },
    ];

    Users.find.mockResolvedValueOnce(mockUserData);

    // Act
    const result = await getUsers();

    // Assert
    expect(result).toEqual(mockUserData);
  });

  it("should return an empty array when there are no users in the database", async () => {
    // Arrange
    Users.find.mockResolvedValueOnce([]);

    // Act
    const result = await getUsers();

    // Assert
    expect(result).toEqual([]);
  });

  it("should return an error when there is an exception", async () => {
    // Arrange
    Users.find.mockRejectedValueOnce(new Error("Some error"));

    // Act
    const result = await getUsers();

    // Assert
    expect(result).toBeInstanceOf(Error);
  });
});

describe("getUsersById function", () => {
  it("should get a user by ID when the user is found", async () => {
    // Arrange
    const mockUserId = "mockUserId";
    const mockUserData = {
      _id: mockUserId,
      username: "testuser",
      email: "test@example.com",
    };

    Users.findById.mockResolvedValueOnce(mockUserData);

    // Act
    const result = await getUsersById(mockUserId);

    // Assert
    expect(result).toEqual(mockUserData);
  });

  it("should return null when the user is not found", async () => {
    // Arrange
    const mockUserId = "nonexistentUserId";
    Users.findById.mockResolvedValueOnce(null);

    // Act
    const result = await getUsersById(mockUserId);

    // Assert
    expect(result).toBeNull();
  });

  it("should return an error when there is an exception", async () => {
    // Arrange
    const mockUserId = "mockUserId";
    Users.findById.mockRejectedValueOnce(new Error("Some error"));

    // Act
    const result = await getUsersById(mockUserId);

    // Assert
    expect(result).toBeInstanceOf(Error);
  });
});


describe('loginUser function', () => {
  it('should return a token when login is successful', async () => {
    // Arrange
    const mockUserData = {
      email: 'test@example.com',
      generateAuthToken: mockGenerateAuthToken
    };
    const mockToken = 'mockToken';
    resultMock.userInfo = mockToken;
    Users.findOne.mockResolvedValueOnce(mockUserData);
    mockGenerateAuthToken.mockResolvedValueOnce(resultMock.userInfo);

    // Act
    const result = await loginUser('test@example.com', 'password123');
  });

  it('should return "User not found" when user is not found', async () => {
    // Arrange
    Users.findOne.mockResolvedValueOnce(null);

    // Act
    const result = await loginUser('nonexistent@example.com', 'password123');
  });

  it('should return "Invalid User Details!!" when password does not match', async () => {
    // Arrange
    const mockUserData = {
      email: 'test@example.com',
    };

    Users.findOne.mockResolvedValueOnce(mockUserData);

    // Act
    const result = await loginUser('test@example.com', 'wrongPassword');
  });

  it('should return an error when there is an exception', async () => {
    // Arrange
    
    Users.findOne.mockRejectedValueOnce(new Error('Some error'));
    
    // Act
    const result = await loginUser('test@example.com', 'password123');
    
    // Assert
     expect(result.error).toBeInstanceOf(Error);
  });
});