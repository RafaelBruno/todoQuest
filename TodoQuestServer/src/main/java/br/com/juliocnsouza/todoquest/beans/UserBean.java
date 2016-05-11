package br.com.juliocnsouza.todoquest.beans;

import br.com.juliocnsouza.todoquest.collections.SystemUser;
import br.com.juliocnsouza.todoquest.db.AbstractFacade;
import javax.ejb.LocalBean;
import javax.ejb.Stateless;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;

/**
 *
 * @author julio
 */
@Stateless
@LocalBean
public class UserBean extends AbstractFacade<SystemUser> {

    @PersistenceContext( unitName = PERSISTENCE_UNIT )
    private EntityManager em;

    public UserBean() {
        super( SystemUser.class );
    }

    @Override
    protected EntityManager getEntityManager() {
        return em;
    }

    public boolean updateWithNoChangesToPassword( SystemUser user ) {
        if ( user == null || user.getLogin() == null ) {
            return false;
        }
        SystemUser userOnDB = getEntity( user.getLogin() );
        if ( userOnDB == null ) {
            return false;
        }
        String keeptPswEncripeted = userOnDB.getPassword();
        user.setPassword( keeptPswEncripeted );
        return saveEntity( user , user.getLogin() ) != null;
    }

    public boolean changePassword( SystemUser user ) {
        if ( user == null || user.getLogin() == null ) {
            return false;
        }
        SystemUser userOnDB = getEntity( user.getLogin() );
        if ( userOnDB == null ) {
            return false;
        }
        String newPsw = user.getPassword();
        userOnDB.setPasswordMD5( newPsw );
        return saveEntity( userOnDB , user.getLogin() ) != null;
    }

    public boolean subscribe( SystemUser subscribeUser )
            throws Exception {
        if ( subscribeUser == null || subscribeUser.getLogin() == null || subscribeUser.getPassword() == null ) {
            return false;
        }
        if ( getEntity( subscribeUser.getLogin() ) != null ) {
            throw new Exception( "user alredy exists" );
        }
        subscribeUser.criptPasswordMD5();
        return saveEntity( subscribeUser , subscribeUser.getLogin() ) != null;
    }

}
