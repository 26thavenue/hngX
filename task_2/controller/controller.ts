import { Request, Response } from 'express';
import User from '../model/model';
import { isValidObjectId } from "mongoose";


export const createUser = async (req: Request, res: Response) => {
   const receivedParam = req.body?.name as string;
   const name = receivedParam?.trim();

  try {
    if (!name) {
      return res.status(400).json({ message: "No name was specified!" });
    } else {
      const existingUser = await User.findOne({ name });

      if (existingUser) {
        return res.status(409).json({
          message: "A user with that name already exists",
        });
      } else {
        const { name: username, _id: id } = await new User({ name }).save();

        return res.json({ name: username, id });
      }
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Something went wrong" });
  }
};

export const readUser= async (req: Request, res: Response) => {
  const id:string = req.params?.id
  try {
     if (!id) {
      return res.status(400).json({ message: "There is no id given!" });
    } else if (!isValidObjectId(id)) {
      return res.status(400).json({ message: "Invalid userId" });
    } else {
      const returnedUser = await User.findById(id);

      if (!returnedUser) {
        return res.status(404).json({
          message: "This user does not exist",
        });
      } else {
        const { name, _id: id } = returnedUser;

        return res.json({ user: name, id });
      }
    }
    } catch (err) {
      console.error(err as string);
      return res.status(500).json({ error: 'unable to process request' }); 
    }
}

export const updateUser = async (req: Request, res: Response) => {
  const updateDetails = req.body?.name?.trim() as string;
  const id= req.params?.id.trim();

  try {
    if (!id) {
    return res.status(400).json({ error: 'You need an id to perform this operation' });
    } 
    else if (!isValidObjectId(id)) {
        return res.status(400).json({ message: "Invalid Id" });
    }
    else if (!updateDetails) {
      return res.status(400).json({ error: 'The name field is empty' });
    }
    else{
      const checkDuplicateNme = await User.findOne({ name: updateDetails });
      if (checkDuplicateNme) {
        return res.status(409).json("This target name already exists");
      } else {
        const updatedUser = await User.findByIdAndUpdate(
          { _id: id },
          { name: updateDetails }
        );

        if (!updatedUser) {
          return res.status(404).json({
            message: "ID does not exist",
          });
        } else {
          const { _id: id } = updatedUser;

          res.json({ name: updateDetails, id });
        }
      }
    }
  } catch (err) {
    res.status(500).json({ error: 'There is an error with the server' });

    console.error(err as string);
  }
}  

export const deleteUser = async (req: Request, res: Response) => {
  const id: string = req.params?.id;
  try {
    if (!id) {
      return res.status(400).json({ message: "There is no id given!" });
    } else if (!isValidObjectId(id)) {
      return res.status(400).json({ message: "Invalid userId" });
    } else {
      const data = await User.findByIdAndDelete(id);

        if (!data) {
          return res.status(404).json({ error: 'User not found' });
        }else{
          return res.status(200).json({ message: `User with id: ${id} has been succesfully deleted` });
        }
    
  }
  } catch (err) {
    res.status(500).json({ error: 'There is an error with the server' });
    console.error(err as string);
  }
  
};

