package it.user.model.response;

import lombok.*;
import org.springframework.http.HttpStatus;

import java.net.http.HttpRequest;
import java.net.http.HttpResponse;

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
