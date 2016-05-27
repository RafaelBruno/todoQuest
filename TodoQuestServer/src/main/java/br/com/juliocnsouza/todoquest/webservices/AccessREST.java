package br.com.juliocnsouza.todoquest.webservices;

import br.com.juliocnsouza.todoquest.beans.AccessBean;
import br.com.juliocnsouza.todoquest.collections.SystemUser;
import br.com.juliocnsouza.todoquest.util.GsonSingleton;
import javax.ejb.LocalBean;
import javax.ejb.Stateless;
import javax.inject.Inject;
import javax.ws.rs.GET;
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
@Path( "/access" )

public class AccessREST {

    @Inject
    private AccessBean accessBean;

    @GET
    @Path( "/login/{user}/{password}" )
    @Produces( { "application/json" } )
    public Response login( @PathParam( "user" ) String userId , @PathParam( "password" ) String password ) {
        SystemUser user = accessBean.login( userId , password );
        if ( user == null ) {
            return Response.status( Response.Status.UNAUTHORIZED ).build();
        }
        return Response.ok( GsonSingleton.getInstance().toJson( user ) ).build();
    }

}
