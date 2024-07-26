import { User } from '../entities/User';

export const getUser = async (req: any, res: any) => {
  const { id } = req.params;

  console.log('id', id);

  try {
    const user = await User.findOneById(id);
    console.log('user', user);

    if (!user) return res.status(400).json({ error: 'User not found!' });

    res.status(200).json({ user });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
    console.log('Error in getUser: ', err.message);
  }
};
