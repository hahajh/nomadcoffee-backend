import { createWriteStream } from "fs";
import * as bcrypt from "bcrypt";
import { Resolvers } from "../../types";
import { protectResolver } from "../users.utils";

const resolver: Resolvers = {
    Mutation: {
        editProfile: protectResolver(
            async (
                _,
                { username, email, name, location, avartarURL, githubUsername, password: newPassword },
                { loggedInUser, client }
            ) => {
                try {
                    let avartarTmpUrl = null;
                    if (avartarURL) {
                        const { filename, createReadStream } = await avartarURL;
                        const newFilename = `${loggedInUser.id}-${Date.now()}-${filename}`;
                        const readStream = createReadStream();
                        const writeStream = createWriteStream(
                            process.cwd() + "/uploads/" + newFilename
                        );
                        readStream.pipe(writeStream);
                        avartarTmpUrl = `http://localhost:4000/static/${newFilename}`;
                    }
                    let uglyPassword = null;
                    if (newPassword) {
                        uglyPassword = await bcrypt.hash(newPassword, 10);
                    }
                    const updatedUser = await client.user.update({
                        where: {
                            id: loggedInUser.id
                        },
                        data: {
                            username,
                            email,
                            name,
                            location,
                            githubUsername,
                            ...(avartarTmpUrl && { avartarURL: avartarTmpUrl }),
                            ...(uglyPassword && { password: uglyPassword })
                        }
                    })
                    if (updatedUser.id) {
                        return {
                            ok: true
                        }
                    } else {
                        return {
                            ok: false,
                            error: "Can't update user info"
                        }
                    }
                } catch (e) {
                    return e;
                }
            }
        )
    }
}

export default resolver;