package br.com.juliocnsouza.todoquest.util;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;

/**
 *
 * @author julio
 */
public class GsonSingleton {

    private static Gson gson;

    public static Gson getInstance() {
        if ( gson == null ) {
            gson = new GsonBuilder().setDateFormat(
                    "dd/MM/yyyy HH:mm" ).create();
        }
        return gson;
    }

}
