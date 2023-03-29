package it.user.model.response;

import lombok.Data;

@Data
public class RequestItemAdd<T> {

    String email;

    T idProdotto;
}
