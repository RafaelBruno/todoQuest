package br.com.juliocnsouza.todoquest.beans;

import br.com.juliocnsouza.todoquest.collections.Mission;
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

}
