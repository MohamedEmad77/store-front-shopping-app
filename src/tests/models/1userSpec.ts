import { User, UserModel } from '../../models/user';

const model = new UserModel();

describe('User Model tests', () => {
  it('should have an index method', () => {
    expect(model.index).toBeDefined();
  });

  it('should have a show method', () => {
    expect(model.show).toBeDefined();
  });

  it('should have a create method', () => {
    expect(model.create).toBeDefined();
  });

  it('create method should add a user', async () => {
    const u: User = {
      email: 'test@test.com',
      password: '123456',
      firstName: 'test',
      lastName: 'test test',
    };
    const result: any = await model.create(u);
    expect(result).toEqual({
      id: 1,
      firstname: 'test',
      lastname: 'test test',
      email: 'test@test.com',
      password: '123456',
    });
  });

  it('create method should add another user', async () => {
    const u: User = {
      email: 'test2@test.com',
      password: '123456',
      firstName: 'test2',
      lastName: 'test2 test2',
    };
    const result: any = await model.create(u);
    expect(result).toEqual({
      id: 2,
      firstname: 'test2',
      lastname: 'test2 test2',
      email: 'test2@test.com',
      password: '123456',
    });
  });

  it('show method should return the correct user', async () => {
    const result: any = await model.show('1');
    expect(result).toEqual({
      id: 1,
      firstname: 'test',
      lastname: 'test test',
      email: 'test@test.com',
      password: '123456',
    });

    const result1: any = await model.show('2');
    expect(result1).toEqual({
      id: 2,
      firstname: 'test2',
      lastname: 'test2 test2',
      email: 'test2@test.com',
      password: '123456',
    });
  });

  it('index method should return a list of users', async () => {
    const result: any = await model.index();
    expect(result).toEqual([
      {
        id: 1,
        firstname: 'test',
        lastname: 'test test',
        email: 'test@test.com',
        password: '123456',
      },
      {
        id: 2,
        firstname: 'test2',
        lastname: 'test2 test2',
        email: 'test2@test.com',
        password: '123456',
      },
    ]);
  });
});
