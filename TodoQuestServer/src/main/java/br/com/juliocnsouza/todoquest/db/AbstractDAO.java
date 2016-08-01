package br.com.juliocnsouza.todoquest.db;

import java.io.Serializable;
import java.lang.reflect.Field;
import java.util.List;
import java.util.logging.Level;
import java.util.logging.Logger;
import javax.persistence.EmbeddedId;
import javax.persistence.EntityManager;
import javax.persistence.Id;
import javax.persistence.Query;

/*
 * @author julio
 */
public abstract class AbstractDAO<T> {

    public static final String PERSISTENCE_UNIT = "TodoQuestPU";

    public static final String EXCEPTION_WHILE_SAVING_ENTITY = "Exception while saving entity ";

    private final Class<T> entityClass;

    public AbstractDAO( Class<T> entityClass ) {
        this.entityClass = entityClass;
    }

    protected abstract EntityManager getEntityManager();

    public <T> Object saveEntity( Object entity ,
                                  Serializable pk ) {

        boolean checkId = false;
        try {
            checkId = getId( entityClass , entity ) == null;
        }
        catch ( SecurityException ex ) {
            Logger.getLogger( this.getClass().getName() ).log( Level.SEVERE ,
                                                               ex.getMessage() );
            Logger.getLogger(AbstractDAO.class.getName() ).log( Level.SEVERE ,
                                                                    "{0}" + " " + EXCEPTION_WHILE_SAVING_ENTITY + "{1}" ,
                                                                    new Object[]{
                                                                        entityClass.getSimpleName() ,
                                                                        ex.getMessage() } );
        }
        catch ( NoSuchFieldException ex ) {
            Logger.getLogger( this.getClass().getName() ).log( Level.SEVERE ,
                                                               ex.getMessage() );

            Logger.getLogger(AbstractDAO.class.getName() ).log( Level.SEVERE ,
                                                                    "{0}" + " " + EXCEPTION_WHILE_SAVING_ENTITY + "{1}" ,
                                                                    new Object[]{
                                                                        entityClass.getSimpleName() ,
                                                                        ex.getMessage() } );
        }
        catch ( IllegalArgumentException ex ) {
            Logger.getLogger( this.getClass().getName() ).log( Level.SEVERE ,
                                                               ex.getMessage() );

            Logger.getLogger(AbstractDAO.class.getName() ).log( Level.SEVERE ,
                                                                    "{0}" + " " + EXCEPTION_WHILE_SAVING_ENTITY + "{1}" ,
                                                                    new Object[]{
                                                                        entityClass.getSimpleName() ,
                                                                        ex.getMessage() } );
        }
        catch ( IllegalAccessException ex ) {
            Logger.getLogger( this.getClass().getName() ).log( Level.SEVERE ,
                                                               ex.getMessage() );

            Logger.getLogger(AbstractDAO.class.getName() ).log( Level.SEVERE ,
                                                                    "{0}" + " " + EXCEPTION_WHILE_SAVING_ENTITY + "{1}" ,
                                                                    new Object[]{
                                                                        entityClass.getSimpleName() ,
                                                                        ex.getMessage() } );
        }
        catch ( Exception ex ) {
            Logger.getLogger( this.getClass().getName() ).log( Level.SEVERE ,
                                                               ex.getMessage() );

            Logger.getLogger(AbstractDAO.class.getName() ).log( Level.SEVERE ,
                                                                    "{0}" + " " + EXCEPTION_WHILE_SAVING_ENTITY + "{1}" ,
                                                                    new Object[]{
                                                                        entityClass.getSimpleName() ,
                                                                        ex.getMessage() } );
        }

        Object merge = null;
        merge = getEntityManager().merge( entity );

        getEntityManager().getEntityManagerFactory().getCache().evictAll();
        return merge;

    }

    private Serializable getId( Class<?> clazz , Object object )
            throws SecurityException ,
                   NoSuchFieldException ,
                   IllegalArgumentException ,
                   IllegalAccessException {
        for ( Field field : clazz.getDeclaredFields() ) {
            if ( ( field.getAnnotation( Id.class ) ) != null
                    || field.getAnnotation( EmbeddedId.class ) != null ) {
                field.setAccessible( true );
                if ( object instanceof String ) {
                    return object.toString();
                }
                if ( field.get( object ) instanceof Serializable ) {
                    return ( Serializable ) ( field.get( object ) );
                }
            }
        }
        return null;
    }

    public List<T> getList( String namedQuery , QueryParameters... paramenters ) {

        Query query = getEntityManager().createNamedQuery( namedQuery );
        if ( paramenters != null ) {
            for ( QueryParameters param : paramenters ) {
                query.setParameter( param.getField() ,
                                    param.getParameter() );
            }
        }
        if ( query == null ) {
            throw new RuntimeException( "null named query: " + namedQuery );
        }
        final List resultList = query.getResultList();
        @SuppressWarnings( "unchecked" )
        List<T> listToReturn = resultList == null
                               ? null
                               : resultList;
        return listToReturn;
    }

    public List<T> getListFromJPQL( String jpql , QueryParameters... parametros ) {
        Query query = getEntityManager().createQuery( jpql );
        if ( parametros != null ) {
            for ( QueryParameters param : parametros ) {
                query.setParameter( param.getField() ,
                                    param.getParameter() );
            }
        }
        List<T> listToReturn = query.getResultList();
        return listToReturn;
    }

    public List<T> getDelimetedResultsSizeList( String namedQuery , int listSize ,
                                                QueryParameters... parameters ) {

        Query query = getEntityManager().createNamedQuery( namedQuery );
        query.setMaxResults( listSize );
        if ( parameters != null ) {
            for ( QueryParameters param : parameters ) {
                query.setParameter( param.getField() ,
                                    param.getParameter() );
                query.setMaxResults( listSize );
            }
        }
        List<T> listToReturn = query.getResultList();
        return listToReturn;
    }

    public T getEntity( Serializable pk ) {
        T entityToReturn = getEntityManager().find( entityClass , pk );
        return entityToReturn;
    }

    public boolean removeEntity( Object objectToRemove , Serializable pk ) {
        if ( pk != null && !pk.equals( 0 ) ) {
            try {
                getEntityManager().find( entityClass , pk );
                objectToRemove = getEntityManager().getReference( entityClass ,
                                                                  pk );
                getEntityManager().remove( objectToRemove );
                getEntityManager().getEntityManagerFactory().getCache().evictAll();
                return true;
            }
            catch ( Exception ex ) {
                Logger.getLogger( this.getClass().getName() ).log( Level.SEVERE ,
                                                                   ex.getMessage() );
                Logger.getLogger(AbstractDAO.class.getName() ).log(
                        Level.SEVERE ,
                        "{0}" + " " + EXCEPTION_WHILE_SAVING_ENTITY + "{1}" ,
                        new Object[]{
                            entityClass.getSimpleName() ,
                            ex.getMessage() } );
                return false;
            }
        }
        return false;
    }

    public Long getCount( String namedQuery , QueryParameters... parameters ) {
        Query query = getEntityManager().createNamedQuery( namedQuery );
        if ( parameters != null ) {
            for ( QueryParameters param : parameters ) {
                query.setParameter( param.getField() ,
                                    param.getParameter() );
            }
        }
        Long toReturn = ( Long ) query.getSingleResult();
        return toReturn;
    }

    public void detache( T t ) {
        getEntityManager().detach( t );
    }

}
