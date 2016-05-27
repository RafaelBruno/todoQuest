package br.com.juliocnsouza.todoquest.webservices;

import br.com.juliocnsouza.todoquest.beans.AccessBean;
import br.com.juliocnsouza.todoquest.beans.UserBean;
import br.com.juliocnsouza.todoquest.collections.SystemUser;
import br.com.juliocnsouza.todoquest.util.JsonUtil;
import br.com.juliocnsouza.todoquest.util.SimpleMessageJson;
import java.util.logging.Level;
import java.util.logging.Logger;
import javax.ejb.LocalBean;
import javax.ejb.Stateless;
import javax.inject.Inject;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.Response;

/**
 *
 * @author julio
 */
@Stateless
@LocalBean
@Path( "/user" )
public class UserREST {

    @Inject
    private AccessBean accessBean;

    @Inject
    private UserBean userBean;

    @POST
    @Path( "/subscribe" )
    @Produces( { "application/json" } )
    public Response subscribe( String json ) {
        try {
            if ( userBean.subscribe( new JsonUtil<SystemUser>( SystemUser.class ).fromJson( json ) ) ) {
                return Response.ok().build();
            }
        }
        catch ( Exception ex ) {
            Logger.getLogger( UserREST.class.getName() ).log( Level.SEVERE , null , ex );
            return Response.ok( new SimpleMessageJson( ex.getMessage() ).get() ).build();
        }
        return Response.status( Response.Status.BAD_REQUEST ).build();
    }

    @POST
    @Path( "/update/{hash}" )
    @Produces( { "application/json" } )
    public Response save( @PathParam( "hash" ) String hash , String json ) {
        if ( !accessBean.isLogged( hash ) ) {
            return Response.status( Response.Status.UNAUTHORIZED ).build();
        }
        if ( userBean.updateWithNoChangesToPassword( new JsonUtil<SystemUser>( SystemUser.class ).fromJson( json ) ) ) {
            return Response.ok().build();
        }
        return Response.status( Response.Status.BAD_REQUEST ).build();
    }

    @POST
    @Path( "/changePassword/{hash}" )
    @Produces( { "application/json" } )
    public Response changePassword( @PathParam( "hash" ) String hash , String json ) {
        if ( !accessBean.isLogged( hash ) ) {
            return Response.status( Response.Status.UNAUTHORIZED ).build();
        }
        if ( userBean.changePassword( new JsonUtil<SystemUser>( SystemUser.class ).fromJson( json ) ) ) {
            return Response.ok().build();
        }
        return Response.status( Response.Status.BAD_REQUEST ).build();
    }

}
