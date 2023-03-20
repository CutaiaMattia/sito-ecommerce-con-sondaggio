package it.user.model.response;

import lombok.*;
import org.springframework.http.HttpStatus;


@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ResponseUser {

    Object Body;
    HttpStatus response;

    String message;
}
