package br.com.juliocnsouza.todoquest.util;

import br.com.juliocnsouza.todoquest.collections.SystemUser;
import com.google.gson.Gson;
import com.google.gson.JsonSyntaxException;

/**
 *
 * @author julio
 */
public class SystemUserUtil {

    private final Gson g;

    public SystemUserUtil() {
        g = GsonSingleton.getInstance();
    }

    public SystemUser clone( SystemUser user ) {
        if ( user == null ) {
            return null;
        }
        return convertFromJson( g.toJson( user ) );
    }

    public SystemUser convertFromJson( String json )
            throws JsonSyntaxException {
        return g.fromJson( json , SystemUser.class );
    }

}
