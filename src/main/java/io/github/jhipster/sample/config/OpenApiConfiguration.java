package io.github.jhipster.sample.config;

import io.swagger.v3.oas.models.Components;
import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Contact;
import io.swagger.v3.oas.models.info.Info;
import io.swagger.v3.oas.models.info.License;
import io.swagger.v3.oas.models.security.SecurityRequirement;
import io.swagger.v3.oas.models.security.SecurityScheme;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Profile;

@Configuration
@Profile("api-docs")
public class OpenApiConfiguration {

    @Bean
    public OpenAPI customOpenAPI() {
        return new OpenAPI()
            .info(
                new Info()
                    .title("JHipster Sample Application API")
                    .description(
                        "API documentation for the JHipster Sample Application – a full-stack monolith managing bank accounts, operations, and labels."
                    )
                    .version("0.0.1-SNAPSHOT")
                    .contact(new Contact().name("JHipster").url("https://www.jhipster.tech"))
                    .license(new License().name("Apache 2.0").url("https://www.apache.org/licenses/LICENSE-2.0"))
            )
            .addSecurityItem(new SecurityRequirement().addList("jwt"))
            .components(
                new Components().addSecuritySchemes(
                    "jwt",
                    new SecurityScheme()
                        .name("jwt")
                        .type(SecurityScheme.Type.HTTP)
                        .scheme("bearer")
                        .bearerFormat("JWT")
                        .description("Enter the JWT token obtained from the /api/authenticate endpoint")
                )
            );
    }
}
