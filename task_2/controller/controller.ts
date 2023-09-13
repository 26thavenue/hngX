import { Request, Response } from 'express';
import User from '../model/model';
import { nanoid } from 'nanoid';
import type {IUser} from '../types'


export const createUser = async (req: Request, res: Response) => {
  const details:IUser = req.body

  if(!details.name) {
     return res.status(404).json({error: 'Name is required'})
  }
  if (typeof details.name !== 'string') {
    return res.status(400).json({ error: 'name must be a string' });
  }

  const checkforDuplicate = details.name

  const duplicate = await User.findOne({checkforDuplicate}).lean().exec();

  if (duplicate) {
    return res.status(409).json({message: 'Duplicate username'});
  }
  
  try {
    const newUser = {
        id: nanoid(5),
        name: details.name as string
      };

    const data = await User.create(newUser);
    return res.json(data);
} catch (err) {
    const errorCode = (err as { code: number }).code;
      if (errorCode && errorCode == 11000) {
        return res.status(409).json({ error: 'user with slack name exists ' });
      }
      res.status(500).json({ error: 'unable to process request' });

      console.error(err as string);
  }
};

export const readUser= async (req: Request, res: Response) => {
  const userId:string = req.params.id
  try {
      // get user from db
      const user = await User.findOne({ id: userId }, { __v: 0, _id: 0 });

      if (!user) {
        return res.status(404).json({ error: 'user not found' });
      }

      return res.status(200).json(user)
    } catch (err) {
      res.status(500).json({ error: 'unable to process request' });

      console.error(err as string);
    }
}

export const updateUser = async (req: Request, res: Response) => {
  const updateDetails = req.body;
  const userId: string = req.params.id;

  if (!userId) {
    return res.status(400).json({ error: 'You need an id to erform this operation' });
  }

  if (!updateDetails.name) {
    return res.status(400).json({ error: 'The name field is empty' });
  }

  try {
    const data = await User.findOneAndUpdate(
      { id: userId },
      { name: updateDetails.name },
      { new: true }
    );

    if (!data) {
      return res.status(404).json({ error: 'User does not exist' });
    }

    return res
      .status(200)
      .json({ messsage: `User updated with ${userId} was updated`});
  } catch (err) {
    res.status(500).json({ error: 'There is an error with the server' });

    console.error(err as string);
  }
}  

export const deleteUser = async (req: Request, res: Response) => {
    const userId: string = req.params.id;
    console.log(userId);

  try {
    const data = await User.findOneAndDelete({ id: userId });

    if (data == null) {
      return res.status(404).json({ error: 'User not found' });
    }

    return res.status(200).json({ message: `User with ${userId} has been deleted` });
  } catch (err) {
    res.status(500).json({ error: 'There is an error with the server' });
    console.error(err as string);
  }
  
};

