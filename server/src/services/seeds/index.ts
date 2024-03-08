import { copyFileSync, existsSync, mkdirSync, rmSync } from 'fs';
import path from 'path';
import { cwd } from 'process';
import { v4 as uuid } from 'uuid';

import { ABSOLUTE_TEMPORARY_IMAGE_PATH, ABSOLUTE_USER_UPLOADS_IMAGE_PATH, ABSOLUTE_USER_UPLOADS_IMAGE_PATH_FOR_RETRIEVAL } from '../../config/uploadPaths';
import { Image, User } from "../../models";
import { hashPassword } from "../password";
import { users } from "./users";

export const seed = async () => {
  try {
    if (existsSync(ABSOLUTE_USER_UPLOADS_IMAGE_PATH)) {
      rmSync(ABSOLUTE_USER_UPLOADS_IMAGE_PATH, { recursive: true, force: true });
      mkdirSync(ABSOLUTE_USER_UPLOADS_IMAGE_PATH, { recursive: true });
    }
    if (existsSync(ABSOLUTE_TEMPORARY_IMAGE_PATH)) {
      rmSync(ABSOLUTE_TEMPORARY_IMAGE_PATH, { recursive: true, force: true });
      mkdirSync(ABSOLUTE_TEMPORARY_IMAGE_PATH, { recursive: true });
    }


    const allUsers: User[] = [];

    for (let i = 0; i < users.length; i++) {
      const hashedPW = await hashPassword(users[i].password);
      const user = await User.create({
        ...users[i],
        password: hashedPW,
      });

      const id1 = uuid();
      const id2 = uuid();
      const id3 = uuid();

      const baseSeedPath = path.join(cwd(), 'src', 'services', 'seeds', 'images');
      const baseImagePath = path.join(cwd(), 'src', 'images', 'user-uploads', user.getDataValue('id') || '');

      const userImageSeedPath1 = path.join(baseSeedPath, `${i === 0 ? 0 : 1}.jpg`);
      const userImageSeedPath2 = path.join(baseSeedPath, `${i === 0 ? 2 : 3}.jpg`);
      const userImageSeedPath3 = path.join(baseSeedPath, `${i === 0 ? 4 : 5}.jpg`);
      const userImagePath1 = path.join(baseImagePath, `${id1}.jpg`);
      const userImagePath2 = path.join(baseImagePath, `${id2}.jpg`);
      const userImagePath3 = path.join(baseImagePath, `${id3}.jpg`);

      if (existsSync(baseImagePath)) {
        rmSync(baseImagePath, {
          recursive: true,
          force: true,
        });
      }

      if (!existsSync(baseImagePath)) {
        mkdirSync(baseImagePath, { recursive: true });
      }

      await Image.create({
        id: id1,
        path: `${ABSOLUTE_USER_UPLOADS_IMAGE_PATH_FOR_RETRIEVAL}/${user.getDataValue('id') || ''}/${id1}.jpg`,
        userId: user.getDataValue('id'),
      });
      await Image.create({
        id: id2,
        path: `${ABSOLUTE_USER_UPLOADS_IMAGE_PATH_FOR_RETRIEVAL}/${user.getDataValue('id') || ''}/${id2}.jpg`,
        userId: user.getDataValue('id'),
      });
      await Image.create({
        id: id3,
        path: `${ABSOLUTE_USER_UPLOADS_IMAGE_PATH_FOR_RETRIEVAL}/${user.getDataValue('id') || ''}/${id3}.jpg`,
        userId: user.getDataValue('id'),
      });

      copyFileSync(path.join(userImageSeedPath1), path.join(userImagePath1));
      copyFileSync(path.join(userImageSeedPath2), path.join(userImagePath2));
      copyFileSync(path.join(userImageSeedPath3), path.join(userImagePath3));

      allUsers.push(user);
    }
  } catch(err) {
    console.error(err);
  }
};
