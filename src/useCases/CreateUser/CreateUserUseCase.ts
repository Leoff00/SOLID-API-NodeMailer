import { IMailProvider } from "./../../providers/IMailProvider";
import { User } from "./../../entities/User";
import { ICreateUserRequestDTO } from "./CreateUserDTO";
import { IUsersRepository } from "./../../repositories/IUserRepository";

export class CreateUserUseCase {
  constructor(
    private usersRepository: IUsersRepository,
    private mailProvider: IMailProvider
  ) {}

  async execute(data: ICreateUserRequestDTO) {
    const userAlreadyExists = await this.usersRepository.findByEmail(
      data.email
    );
    if (userAlreadyExists) {
      throw new Error("User already exists");
    }

    const user = new User(data);
    await this.usersRepository.save(user);

    await this.mailProvider.sendMail({
      to: {
        name: data.name,
        email: data.email,
      },

      from: {
        name: "Equipe Zinnlua",
        email: "leolunardr3@gmail.com",
      },
      subject: "Testando envio de email.",
      body: "<p>Mensagem encaminhada com sucesso ao destinatário.</p>",
    });
  }
}
