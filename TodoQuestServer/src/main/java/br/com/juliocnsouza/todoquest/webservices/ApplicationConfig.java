package br.com.juliocnsouza.todoquest.webservices;

import java.util.Set;
import java.util.logging.Level;
import java.util.logging.Logger;
import javax.ws.rs.core.Application;

/**
 *
 * @author julio
 */
@javax.ws.rs.ApplicationPath( "webservices" )
public class ApplicationConfig extends Application {

    @Override
    public Set<Class<?>> getClasses() {
        final Set<Class<?>> resources = new java.util.HashSet<Class<?>>();
        try {
            final Class jacksonProvider
                        = Class.forName( "org.codehaus.jackson.jaxrs.JacksonJsonProvider" );
            resources.add( jacksonProvider );
        }
        catch ( final ClassNotFoundException ex ) {
            Logger.getLogger( this.getClass().getSimpleName() ).log( Level.SEVERE ,
                                                                     ex.getMessage() );
        }
        addRestResourceClasses( resources );
        return resources;
    }

    private void addRestResourceClasses( Set<Class<?>> resources) {
        resources.add( br.com.juliocnsouza.todoquest.webservices.AccessREST.class );
        resources.add(br.com.juliocnsouza.todoquest.webservices.MissionREST.class );
        resources.add(br.com.juliocnsouza.todoquest.webservices.QuestREST.class );
        resources.add( br.com.juliocnsouza.todoquest.webservices.UserREST.class );

    }
}
