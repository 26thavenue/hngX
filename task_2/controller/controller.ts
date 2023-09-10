import { Request, Response } from 'express';
import Person, { IPerson,SPerson } from '../model/model';

export const createPerson = async (req: Request, res: Response): Promise<void> => {
  try {
    const person: IPerson = new Person(req.body);
    await person.save();
    res.json(person);
  } catch (err) {
    res.status(400).json({ error: 'Failed to create a person' });
  }
};

export const getPersons = async (req: Request, res: Response): Promise<void> => {
  try {
    const persons: IPerson[] = await Person.find();
    res.json(persons);
  } catch (err) {
    res.status(500).json({ error:'Failed to fetch' });
  }
};

export const getPerson = async (req: Request, res: Response): Promise<void> => {
const id = req.params.id;

if (!id) {
   res.status(400).json({ error: 'Invalid ID' });
}

try {
  const person = await Person.findById(id);
  if (!person) {
   res.status(404).json({ error: 'Person not found' });
  }
  res.json(person);
} catch (err) {
  res.status(500).json({ error: 'Failed to fetch' });
}

};

export const updatePerson = async (req: Request, res: Response): Promise<void> => {
    const id =req.params.id
  
};
export const deletePerson = async (req: Request, res: Response): Promise<void> => {
    const id =req.params.id
  
};
// Implement other controller functions (get by ID, update, delete) similarly
