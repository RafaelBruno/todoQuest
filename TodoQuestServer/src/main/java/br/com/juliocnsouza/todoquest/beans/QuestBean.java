package br.com.juliocnsouza.todoquest.beans;

import br.com.juliocnsouza.todoquest.collections.Quest;
import br.com.juliocnsouza.todoquest.db.AbstractDAO;
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
public class QuestBean extends AbstractDAO<Quest> {

    @PersistenceContext( unitName = PERSISTENCE_UNIT )
    private EntityManager em;

    public QuestBean() {
        super( Quest.class );
    }

    @Override
    protected EntityManager getEntityManager() {
        return em;
    }

    public boolean save( Quest quest , String userId ) {
        if ( quest == null || quest.getUserId() == null || !userId.equals( quest.getUserId() ) ) {
            return false;
        }
        return saveEntity( quest , quest.getId() ) != null;
    }

    public Quest find( String questID , String userID ) {
        if ( questID == null ) {
            return null;
        }
        Quest quest = getEntity( questID );
        if ( quest == null || !userID.equals( quest.getUserId() ) ) {
            return null;
        }
        return quest;
    }

    public List<Quest> findAllFromUser( String userId ) {
        QueryParameters param = new QueryParameters( "userId" , userId );
        return getList( Quest.FIND_ALL_BY_USER , param );
    }

}
