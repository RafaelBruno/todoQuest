package br.com.juliocnsouza.todoquest.db;

/*
 * @author julio
 */
public class QueryParameters {

    private String field;
    private Object parameter;

    public QueryParameters( String fied , Object parameter ) {
        this.field = fied;
        this.parameter = parameter;
    }

    public String getField() {
        return field;
    }

    public void setField( String field ) {
        this.field = field;
    }

    public Object getParameter() {
        return parameter;
    }

    public void setParameter( Object parameter ) {
        this.parameter = parameter;
    }

    @Override
    public String toString() {
        return "{" + field + ":" + parameter.toString() + "}";
    }

}
