package br.com.juliocnsouza.todoquest.beans;

import br.com.juliocnsouza.todoquest.collections.Mission;
import br.com.juliocnsouza.todoquest.db.AbstractFacade;
import br.com.juliocnsouza.todoquest.db.QueryParameters;
import java.util.List;
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
public class MissionBean extends AbstractFacade<Mission> {

    @PersistenceContext( unitName = PERSISTENCE_UNIT )
    private EntityManager em;

    public MissionBean() {
        super( Mission.class );
    }

    @Override
    protected EntityManager getEntityManager() {
        return em;
    }

    public boolean save( Mission mission , String userId ) {
        if ( mission == null || mission.getUserId() == null || !userId.equals( mission.getUserId() ) ) {
            return false;
        }
        return saveEntity( mission , mission.getId() ) != null;
    }

    public Mission find( String misisonID , String userID ) {
        if ( misisonID == null ) {
            return null;
        }
        Mission mission = getEntity( misisonID );
        if ( mission == null || !userID.equals( mission.getUserId() ) ) {
            return null;
        }
        return mission;
    }

    public List<Mission> findAllFromUser( String userId ) {
        QueryParameters param = new QueryParameters( "userId" , userId );
        return getList( Mission.FIND_ALL_BY_USER , param );
    }

}
