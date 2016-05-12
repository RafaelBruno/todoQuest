package br.com.juliocnsouza.todoquest.util;

import com.google.gson.Gson;
import com.google.gson.JsonSyntaxException;
import java.util.List;

/**
 *
 * @author julio
 * @param <T>
 */
public class JsonUtil<T> {

    private final Gson g;
    private final Class<T> clazz;

    public JsonUtil( Class clazz ) {
        g = GsonSingleton.getInstance();
        this.clazz = clazz;
    }

    public T clone( T object ) {
        if ( object == null ) {
            return null;
        }
        return fromJson( g.toJson( object ) );
    }

    public T fromJson( String json )
            throws JsonSyntaxException {
        return g.fromJson( json , clazz );
    }

    public String toJson( T obj ) {
        return g.toJson( obj );
    }

    public String toJson( List<T> list ) {
        return g.toJson( new JsonList( list ) );
    }

    public class JsonList {

        private List<T> list;

        public JsonList() {
        }

        public JsonList( List<T> list ) {
            this.list = list;
        }

        public List<T> getList() {
            return list;
        }

        public void setList( List<T> list ) {
            this.list = list;
        }

    }

}
