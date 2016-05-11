package br.com.juliocnsouza.todoquest.webservices;

import br.com.juliocnsouza.todoquest.beans.AccessBean;
import br.com.juliocnsouza.todoquest.beans.UserBean;
import br.com.juliocnsouza.todoquest.util.SystemUserUtil;
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
    @Path( "/save/hash" )
    @Produces( { "application/json" } )
    public Response save( @PathParam( "hash" ) String hash , String json ) {
        if ( !accessBean.isLogged( hash ) ) {
            return Response.status( Response.Status.UNAUTHORIZED ).build();
        }
        if ( userBean.updateWithNoChangesToPassword( new SystemUserUtil().convertFromJson( json ) ) ) {
            return Response.ok().build();
        }
        return Response.status( Response.Status.BAD_REQUEST ).build();
    }

}
