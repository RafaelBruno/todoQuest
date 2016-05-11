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
        SystemUser fromDB = getEntity( user.getLogin() );
        if ( fromDB == null ) {
            return false;
        }
        String psw = fromDB.getPassword();
        user.setPassword( psw );
        return saveEntity( user , user.getLogin() ) != null;
    }

}
