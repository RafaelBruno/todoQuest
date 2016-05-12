package br.com.juliocnsouza.todoquest.beans;

import br.com.juliocnsouza.todoquest.collections.SystemUser;
import br.com.juliocnsouza.todoquest.util.JsonUtil;
import java.util.HashMap;
import java.util.Map;
import java.util.Random;
import javax.annotation.PostConstruct;
import javax.ejb.Singleton;
import javax.inject.Inject;

/**
 *
 * @author julio
 */
@Singleton
public class AccessBean {

    @Inject
    private UserBean userBean;

    private Map<String , String> loggedUsers;

    @PostConstruct
    public void init() {
        loggedUsers = new HashMap<>();
    }

    public boolean isLogged( String hash ) {
        return loggedUsers.get( hash ) != null;
    }

    public SystemUser login( String userId , String password ) {
        if ( userId == null || password == null ) {
            return null;
        }
        SystemUser user = userBean.getEntity( userId );
        if ( user != null && password.equals( user.getPassword() ) ) {
            SystemUser clone = new JsonUtil<SystemUser>( SystemUser.class ).clone( user );
            String generateHash = generateHash( userId );
            loggedUsers.put( generateHash , userId );
            clone.setPassword( generateHash );
            return clone;
        }
        return null;
    }

    private String generateHash( String userId ) {
        StringBuilder sb = new StringBuilder();
        Random r = new Random();
        for ( Character c : userId.toCharArray() ) {
            sb.append( r.nextInt( 100 ) ).append( c );
        }
        return sb.reverse().toString();
    }

    public String getLogin( String hash ) {
        return loggedUsers.get( hash );
    }

}
