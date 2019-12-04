import { Component, h, Host } from '@stencil/core';
import { newSpecPage } from '@stencil/core/testing';


describe('cloneNode', () => {

  it('non shadow-dom', async () => {
    @Component({ tag: 'cmp-a'})
    class CmpA {
      render() {
        return (
          <div>
            <slot name='start'></slot>
            <section>
              <slot></slot>
            </section>
            <slot name='end'></slot>
          </div>
        );
      }
    }
    const { root, body, waitForChanges } = await newSpecPage({
      components: [CmpA],
      html: `
        <cmp-a>
          <h1>Content</h1>
          <h3 slot="end">End</h3>
          <h2 slot="start">Start</h2>
        </cmp-a>`,
    });

    const deepClone = root.cloneNode(true);
    expect(deepClone).toEqualHtml(`
      <cmp-a>
        <h1>Content</h1>
        <h3 slot="end">End</h3>
        <h2 slot="start">Start</h2>
      </cmp-a>
    `);
    const shallowClone = root.cloneNode();
    expect(shallowClone).toEqualHtml(`<cmp-a></cmp-a>`);


    // Append clones to the dom
    body.appendChild(deepClone);
    body.appendChild(shallowClone);
    await waitForChanges();
    await waitForChanges();

    expect(deepClone).toEqualHtml(`
      <cmp-a>
        <div>
          <h2 slot=\"start\">
            Start
          </h2>
          <section>
            <h1>
              Content
            </h1>
          </section>
          <h3 slot=\"end\">
            End
          </h3>
        </div>
      </cmp-a>
    `);

    expect(shallowClone).toEqualHtml(`
      <cmp-a>
        <div>
          <section></section>
        </div>
      </cmp-a>
    `);
  });

  it('shadow-dom', async () => {
    @Component({ tag: 'cmp-a', shadow: true})
    class CmpA {
      render() {
        return (
          <div>
            <slot name='start'></slot>
            <section>
              <slot></slot>
            </section>
            <slot name='end'></slot>
          </div>
        );
      }
    }
    const { root, body, waitForChanges } = await newSpecPage({
      components: [CmpA],
      html: `
        <cmp-a>
          <h1>Content</h1>
          <h3 slot="end">End</h3>
          <h2 slot="start">Start</h2>
        </cmp-a>`,
    });

    const deepClone = root.cloneNode(true);
    expect(deepClone).toEqualHtml(`
      <cmp-a>
        <mock:shadow-root></mock:shadow-root>
        <h1>Content</h1>
        <h3 slot="end">End</h3>
        <h2 slot="start">Start</h2>
      </cmp-a>
    `);
    const shallowClone = root.cloneNode();
    expect(shallowClone).toEqualHtml(`
      <cmp-a>
        <mock:shadow-root></mock:shadow-root>
      </cmp-a>`);


    // Append clones to the dom
    body.appendChild(deepClone);
    body.appendChild(shallowClone);
    await waitForChanges();
    await waitForChanges();

    expect(deepClone).toEqualHtml(`
      <cmp-a>
        <mock:shadow-root>
          <div>
            <slot name=\"start\"></slot>
            <section>
              <slot></slot>
            </section>
            <slot name=\"end\"></slot>
          </div>
        </mock:shadow-root>

        <h1>Content</h1>
        <h3 slot=\"end\">End</h3>
        <h2 slot=\"start\">Start</h2>
      </cmp-a>
    `);

    expect(shallowClone).toEqualHtml(`
      <cmp-a>
        <mock:shadow-root>
          <div>
            <slot name=\"start\"></slot>
            <section>
              <slot></slot>
            </section>
            <slot name=\"end\"></slot>
          </div>
        </mock:shadow-root>
      </cmp-a>
    `);
  });

});

describe('cloning non-shadow components', () => {
  @Component({ tag: 'comp-a' })
  class CmpA {
    render() {
      return (
        <Host>
          <span class='comp-a-mark-up'>Component mark-up</span>
          <slot></slot>
        </Host>
      );
    }
  }

  it('should not double render after cloning and appending to DOM', async () => {
    const { waitForChanges, body } = await newSpecPage({
      components: [CmpA],
      html: `
        <comp-a>
            <div class="comp-a-slot-content">I am slot content</div>
        </comp-a>
      `,
    });

    await waitForChanges();

    const component = body.querySelector('comp-a');
    component.classList.add('hydrated'); // TODO is there a BUILD flag to do this automatically?
    body.removeChild(component);
    body.appendChild(component.cloneNode(true));

    await waitForChanges();

    expect(body.querySelectorAll('.comp-a-mark-up').length).toBe(1);
    expect(body.querySelectorAll('.comp-a-slot-content').length).toBe(1);
  });

  it('should not double render after cloning and appending to DOM with multiple slots', async () => {
    const { waitForChanges, body } = await newSpecPage({
      components: [CmpA],
      html: `
        <comp-a>
            <div class="comp-a-slot-content">I am slot content</div>
            <div class="comp-a-slot-content-2">I am slot content</div>
        </comp-a>
      `,
    });

    await waitForChanges();

    const component = body.querySelector('comp-a');
    component.classList.add('hydrated'); // TODO is there a BUILD flag to do this automatically?
    body.removeChild(component);
    body.appendChild(component.cloneNode(true));

    await waitForChanges();

    expect(body.querySelectorAll('.comp-a-mark-up').length).toBe(1);
    expect(body.querySelectorAll('.comp-a-slot-content').length).toBe(1);
    expect(body.querySelectorAll('.comp-a-slot-content-2').length).toBe(1);
  });

  it('should not double render after cloning the parent and appending to DOM', async () => {
    const { waitForChanges, body } = await newSpecPage({
      components: [CmpA],
      html: `
        <div id="parent">
          <comp-a>
              <div class="comp-a-slot-content">I am slot content</div>
          </comp-a>
        </div>
      `,
    });

    await waitForChanges();

    const parent = body.querySelector('#parent');
    parent.classList.add('hydrated'); // TODO is there a BUILD flag to do this automatically?
    body.removeChild(parent);
    body.appendChild(parent.cloneNode(true));

    await waitForChanges();

    expect(body.querySelectorAll('.comp-a-mark-up').length).toBe(1);
    expect(body.querySelectorAll('.comp-a-slot-content').length).toBe(1);
  });

  it('should not double render with deep slot after cloning and appending to DOM', async () => {
    @Component({ tag: 'comp-a' })
    class CmpC {
      render() {
        return (
          <Host>
            <p class='comp-c-mark-up'>Component B mark-up</p>
            <div>
              <section>
                  <span>
                    <slot></slot>
                  </span>
              </section>
            </div>
          </Host>
        );
      }
    }

    const { waitForChanges, body } = await newSpecPage({
      components: [CmpC],
      html: `
        <comp-a>
            <div class="comp-c-slot-content">I am slot content</div>
        </comp-a>
      `,
    });

    await waitForChanges();

    const component = body.querySelector('comp-c');
    component.classList.add('hydrated'); // TODO is there a BUILD flag to do this automatically?
    body.removeChild(component);
    body.appendChild(component.cloneNode(true));

    await waitForChanges();

    expect(body.querySelectorAll('.comp-c-mark-up').length).toBe(1);
    expect(body.querySelectorAll('section').length).toBe(1);
    expect(body.querySelectorAll('.comp-c-slot-content').length).toBe(1);
  });

  it('should not double render with nested components', async () => {
    @Component({ tag: 'comp-a' })
    class CmpB {
      render() {
        return (
          <div>
            <p class='comp-b-mark-up'>Component B mark-up</p>
            <slot></slot>
            <comp-a>
              <div class='comp-a-slot-content'>I am slot content</div>
            </comp-a>
          </div>
        );
      }
    }

    const { waitForChanges, body } = await newSpecPage({
      components: [CmpA, CmpB],
      html: `
        <comp-b>
            <h3 class='comp-b-slot-content'>Comp-b slotted content</h3>
        </comp-b>
      `,
    });

    await waitForChanges();

    const componentA = body.querySelector('comp-a');
    const componentB = body.querySelector('comp-b');
    componentA.classList.add('hydrated'); // TODO is there a BUILD flag to do this automatically?
    componentB.classList.add('hydrated'); // TODO is there a BUILD flag to do this automatically?
    body.removeChild(componentA);
    body.appendChild(componentA.cloneNode(true));

    await waitForChanges();

    expect(body.querySelectorAll('.comp-a-mark-up').length).toBe(1);
    expect(body.querySelectorAll('.comp-a-slot-content').length).toBe(1);
    expect(body.querySelectorAll('comp-b').length).toBe(1);
    expect(body.querySelectorAll('.comp-b-mark-up').length).toBe(1);
    expect(body.querySelectorAll('.comp-b-slot-content').length).toBe(1);
  });

  // TODO this is a nice to have, but it is same principle
  it('should not double render after setting innerHTML', async () => {
    const { waitForChanges, body } = await newSpecPage({
      components: [CmpA],
      html: '',
    });

    await waitForChanges();

    // TODO depending on approach we might need to add an attribute to the div
    body.innerHTML = `<comp-a class="hydrated">
         <span>Component mark-up</span>
         <div class="comp-a-slot-content">I am slot content</div>
       </comp-a>`;

    await waitForChanges();

    const component = body.querySelector('comp-a');
    component.classList.add('hydrated'); // TODO is there a BUILD flag to do this automatically?
    body.removeChild(component);
    body.appendChild(component.cloneNode(true));

    await waitForChanges();

    expect(body.querySelectorAll('.comp-a-mark-up').length).toBe(1);
    expect(body.querySelectorAll('.comp-a-slot-content').length).toBe(1);
  });
});
