package br.com.juliocnsouza.javaeedelivery.spring.controllers;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

/**
 *
 * @author julio
 */
@Controller
public class HomeController {

    @RequestMapping( "/" )
    public String index() {
        System.out.println( "getting into home" );
        return "home";
    }

}
