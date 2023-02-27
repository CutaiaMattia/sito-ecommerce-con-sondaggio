# sito-ecommerce-con-sondaggio
progetto di un sito ecommerce basico con un sondaggio clienti gestito da db

Questo è un progetto di un sito eCommerce con un sondaggio per clienti e visitatori.

Il backend è stato realizato con java spring boot. 
Si utilizza jpa per la connessione al database dal quale si recuperano le domande e gli esiti da mostrare e, successivamente, si salva la segnalazione del sondaggio.
Creati tutti gli end point necessari, è stato possibile avviare lo sviluppo del frontend con Angular suddividiso in 5 componenti (homepage, sondaggio, esito, navbar e footer).

Il sondaggio è stato pensato con una singola domanda che decide il percorso di domande da mostrare al fine del quale sarà visualizzato un esito specifico del percorso.
Si precisa che il numero di domande mostrate in un percorso non ha un limite prefissato, la pagina continua a mostrare gruppi di al più 3 domande finchè trova step successivi.
Ad ogni click del bottone 'avanti' l'applicazione aggiorna il db, mentre al click del bottone 'prev' ritorna indietro alla pagina precedende eliminando i record inseriti.
Per evitare di avere delle segnalazioni incomplete, in caso di non completamento del sondaggio, tutta la segnalazione viene cancellata dal db.

Con angular ho gestito il controllo tramite guard per bloccare l'accesso al componente esito e la creazione di un componente per un reindirizzamento ad una pagina 404 custom.
Al momento, l'idSegnalazione dev'essere mockato poichè è un id che successivamente collegherò a l'id dell'utente o ad un identificativo del visitatore.

Lo sviluppo del sito eCommerce è ancora in corso, al momento nel backend è stato fatto il collegamento ad un altro schema dello stesso db.


