package br.com.juliocnsouza.todoquest.webservices;

import br.com.juliocnsouza.todoquest.beans.AccessBean;
import br.com.juliocnsouza.todoquest.beans.QuestBean;
import br.com.juliocnsouza.todoquest.collections.Quest;
import br.com.juliocnsouza.todoquest.util.JsonUtil;
import java.util.List;
import javax.ejb.LocalBean;
import javax.ejb.Stateless;
import javax.inject.Inject;
import javax.ws.rs.GET;
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
@Path( "/quest" )
public class QuestREST {

    @Inject
    private AccessBean accessBean;

    @Inject
    private QuestBean questBean;

    @POST
    @Path( "/save/hash" )
    @Produces( { "application/json" } )
    public Response save( @PathParam( "hash" ) String hash , String json ) {
        if ( !accessBean.isLogged( hash ) ) {
            return Response.status( Response.Status.UNAUTHORIZED ).build();
        }
        if ( questBean.save( new JsonUtil<Quest>( Quest.class ).fromJson( json ) ,
                             accessBean.getLogin( hash ) ) ) {
            return Response.ok().build();
        }
        return Response.status( Response.Status.BAD_REQUEST ).build();
    }

    @GET
    @Path( "/find/id/hash" )
    @Produces( { "application/json" } )
    public Response find( @PathParam( "id" ) String id , @PathParam( "hash" ) String hash ) {
        if ( !accessBean.isLogged( hash ) ) {
            return Response.status( Response.Status.UNAUTHORIZED ).build();
        }
        Quest quest = questBean.find( id , accessBean.getLogin( hash ) );
        if ( quest != null ) {
            return Response.ok( new JsonUtil<Quest>( Quest.class ).toJson( quest ) ).build();
        }
        return Response.status( Response.Status.BAD_REQUEST ).build();
    }

    @GET
    @Path( "/find/hash" )
    @Produces( { "application/json" } )
    public Response findAllFromUser( @PathParam( "hash" ) String hash ) {
        if ( !accessBean.isLogged( hash ) ) {
            return Response.status( Response.Status.UNAUTHORIZED ).build();
        }
        List<Quest> list = questBean.findAllFromUser( accessBean.getLogin( hash ) );
        if ( list != null ) {
            return Response.ok( new JsonUtil<Quest>( Quest.class ).toJson( list ) ).build();
        }
        return Response.status( Response.Status.BAD_REQUEST ).build();
    }

}