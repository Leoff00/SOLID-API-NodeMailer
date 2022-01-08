import { PostgresUsersRepository } from "./../../repositories/implementations/PostgresUsersRepository";
import { MailTrapMailProvider } from "./../../providers/implementations/MailTrapMailProvider";
import { CreateUserUseCase } from "./CreateUserUseCase";
import { CreateUserController } from "./CreateUserController";
const mailtrapMailProvider = new MailTrapMailProvider();
const postgresUsersRepository = new PostgresUsersRepository();
const createUserUseCase = new CreateUserUseCase(
  postgresUsersRepository,
  mailtrapMailProvider
);

const createUserController = new CreateUserController(createUserUseCase);

export { createUserController, createUserUseCase };
