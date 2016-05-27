package br.com.juliocnsouza.todoquest.util;

/**
 *
 * @author julio
 */
public class SimpleMessageJson {

    private String message;

    public SimpleMessageJson( String message ) {
        this.message = message;
    }

    public SimpleMessageJson() {
    }

    public String getMessage() {
        return message;
    }

    public void setMessage( String message ) {
        this.message = message;
    }

    public String get() {
        return GsonSingleton.getInstance().toJson( this );
    }

}
