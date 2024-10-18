// package hcmut.hcmut_spss.Databases;

// import org.springframework.beans.factory.annotation.Autowired;
// import org.springframework.boot.CommandLineRunner;
// import org.springframework.context.annotation.Bean;
// import org.springframework.context.annotation.Configuration;
// import org.springframework.security.crypto.password.PasswordEncoder;

// import org.slf4j.Logger;
// import org.slf4j.LoggerFactory;

// import hcmut.hcmut_spss.Models.Role;
// import hcmut.hcmut_spss.Models.User;
// import hcmut.hcmut_spss.Repositories.UserRepository;

// @Configuration
// public class Database {
//     // Logger is used to print information to terminal
//     private static final Logger logger = LoggerFactory.getLogger(Database.class);

//     @Autowired
//     PasswordEncoder passwordEncoder;

//     // CommandLineRunner is used to initialize data for Database (For testing)
//     @Bean
//     CommandLineRunner initDatabase(UserRepository userRepository) {
//         return new CommandLineRunner() {
//             @Override
//             public void run(String... args) throws Exception {
//                 User user1 = new User("user1@gmail.com", passwordEncoder.encode("1245"), "nccuong@gmail.com", null, null, null, null, null, Role.USER , null, null, null, null);
//                 logger.info("insert user account: " + userRepository.save(user1));
//                 User admin = new User("admin@gmail.com", passwordEncoder.encode("1245"), "nccuong2@gmail.com", null, null, null, null, null, Role.ADMIN , null, null, null, null);
//                 logger.info("insert admin account: " + userRepository.save(admin));
//             }
//         };
//     }
// }

