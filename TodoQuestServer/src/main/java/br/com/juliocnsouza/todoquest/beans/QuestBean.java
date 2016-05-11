package br.com.juliocnsouza.todoquest.beans;

import br.com.juliocnsouza.todoquest.collections.Quest;
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
public class QuestBean extends AbstractFacade<Quest> {

    @PersistenceContext( unitName = PERSISTENCE_UNIT )
    private EntityManager em;

    public QuestBean() {
        super( Quest.class );
    }

    @Override
    protected EntityManager getEntityManager() {
        return em;
    }

}
