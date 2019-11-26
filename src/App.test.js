import React from 'react'
import Enzyme, { shallow } from 'enzyme'
import EnzymeAdapter from 'enzyme-adapter-react-16'

import App from './App'

Enzyme.configure({ adapter: new EnzymeAdapter() })

/**
 * Factory function to create a ShallowWrapper for the App component
 * @function setup 
 * @param {object} props - Component props specific to this setup 
 * @param {object} state - Initial state for setup
 * @return {ShallowWrapper}
 */
const setup = (props={}, state=null) => {
    const wrapper = shallow(<App {...props} />)
    if (state) wrapper.setState(state)

    return wrapper
}

/**
 * Return ShalloWrapper contain node(s) with the given data-test value
 * @param {ShallowWrapper} wrapper - Enzyme shallow wrapper to search within
 * @param {string} val  - Value of data-test attribute for search
 * @return {ShallowWrapper}
 */
const findByTestAttr = (wrapper, val) => {
    return wrapper.find(`[data-test="${val}"]`)
}

test('render without error', () => {
    const wrapper = setup()
    const appComponent = findByTestAttr(wrapper, 'component-app')
    expect(appComponent.length).toBe(1)
})

test('render increment button', () => {
    const wrapper = setup()
    const button = findByTestAttr(wrapper, 'increment-button')
    expect(button.length).toBe(1)
})

test('renders counters display', () => {
    const wrapper = setup()
    const counterDisplay = findByTestAttr(wrapper, 'counter-display')
    expect(counterDisplay.length).toBe(1)
})

test('counter starts at 0', () => {
    const wrapper = setup()
    const initialCounterState = wrapper.state('counter');
    expect(initialCounterState).toBe(0)
})

test('clicking button increments counter display', () => {
    const counter = 7
    const wrapper = setup(null, { counter })

    // find button and simulate a click
    const button = findByTestAttr(wrapper, 'increment-button')
    button.simulate('click')

    wrapper.setState({ error: false })

    // find display and test value
    const counterDisplay = findByTestAttr(wrapper, 'counter-display')
    expect(counterDisplay.text()).toContain(counter + 1)
})

test('message error starts hidden if counter > 0', () => {
    const wrapper = setup()
    const counter = wrapper.state().counter

    // find button and simulate a click
    const button = findByTestAttr(wrapper, 'decrement-button')
    button.simulate('click')

    // find display and test value
    const messageErrorDisplay = findByTestAttr(wrapper, 'message-error')
    
    if(counter > 0)
        expect(messageErrorDisplay.text()).toBe("")
})

test('show message error if counter < 0', () => {
    const wrapper = setup()
    const counter = wrapper.state().counter

    // find button and simulate a click
    const button = findByTestAttr(wrapper, 'decrement-button')
    button.simulate('click')

    // find display and test value
    const messageErrorDisplay = findByTestAttr(wrapper, 'message-error')
    
    if(counter == 0)
        expect(messageErrorDisplay.text()).toBe("The counter can't go below zero")        
})

test('clicking button decrements counter display', () => {
    const wrapper = setup()
    const counter = wrapper.state().counter

    // find button and simulate a click
    const button = findByTestAttr(wrapper, 'decrement-button')
    button.simulate('click')

    const counterDisplay = findByTestAttr(wrapper, 'counter-display')
    
    if(counter > 0)
        expect(counterDisplay.text()).toContain(counter - 1)
})